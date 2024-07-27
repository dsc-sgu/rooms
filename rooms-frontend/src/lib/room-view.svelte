<script lang="ts">
  import DeskMark from './desk-mark.svelte';
  import { browser } from '$app/environment';
  import {
    defaultCoordSystem,
    transformCoordSystem,
    transformCoordSystemBack,
    type CoordSystem
  } from './coord-system';
  import type { Desk } from './desk';

  export let roomName: string;
  export let desks: Desk[];
  export let imgUrl: string;
  export let editorMode: boolean;

  let img: HTMLImageElement | undefined;

  let coordSystemX: CoordSystem = defaultCoordSystem();
  let coordSystemY: CoordSystem = defaultCoordSystem();

  let deskMarkSize: number = 0;
  let deskMarkCursorPosX: number = 0;
  let deskMarkCursorPosY: number = 0;
  let deskMarkCursorShow: boolean = false;

  $: desksWithTransformatedPositions = desks.map((d) => ({
    ...d,
    posX: transformCoordSystem({ pos: d.posX, ...coordSystemX }),
    posY: transformCoordSystem({ pos: d.posY, ...coordSystemY })
  }));

  function addDesk(e: MouseEvent) {
    if (!editorMode || !mouseInAllowableArea(e)) {
      return;
    }

    const posX = transformCoordSystemBack({ pos: deskMarkCursorPosX, ...coordSystemX });
    const posY = transformCoordSystemBack({ pos: deskMarkCursorPosY, ...coordSystemY });
    const num = desks.length === 0 ? 1 : Math.max(...desks.map((d) => d.num)) + 1;

    desks = [
      ...desks,
      {
        isFree: true,
        isSelected: false,
        posX,
        posY,
        num
      }
    ];
  }

  function onDeskClick(num: number) {
    if (editorMode) {
      desks = desks.filter((d) => d.num !== num);
    } else {
      desks = desks.map((d) => (d.num === num ? { ...d, isSelected: !d.isSelected } : d));
    }
  }

  function changeDeskMarkCursor(e: MouseEvent) {
    deskMarkCursorShow = mouseInAllowableArea(e);
    deskMarkCursorPosX = e.clientX - deskMarkSize / 2;
    deskMarkCursorPosY = e.clientY - deskMarkSize / 2;
  }

  function calculateCoordSystems() {
    const imgRect = img?.getBoundingClientRect();

    coordSystemX = {
      actualImgSize: imgRect?.width ?? 0,
      originalImgSize: img?.naturalWidth ?? 0,
      imgPos: imgRect?.x ?? 0
    };

    coordSystemY = {
      actualImgSize: imgRect?.height ?? 0,
      originalImgSize: img?.naturalHeight ?? 0,
      imgPos: imgRect?.y ?? 0
    };

    deskMarkSize = (imgRect?.height || 0) * 0.07;
  }

  function mouseInAllowableArea(e: MouseEvent) {
    const imgRect = img?.getBoundingClientRect();
    if (!imgRect) {
      return false;
    }

    return (
      e.clientX - deskMarkSize / 2 >= imgRect.left &&
      e.clientX + deskMarkSize / 2 <= imgRect.right &&
      e.clientY - deskMarkSize / 2 >= imgRect.top &&
      e.clientY + deskMarkSize / 2 <= imgRect.bottom
    );
  }
</script>

<svelte:window on:resize={calculateCoordSystems} on:mousemove={changeDeskMarkCursor} />

{#if browser}
  <div class="h-full">
    {#each desksWithTransformatedPositions as desk (desk)}
      <button
        class="absolute"
        style:left={`${desk.posX}px`}
        style:top={`${desk.posY}px`}
        on:click={() => onDeskClick(desk.num)}
      >
        <DeskMark size={deskMarkSize} isFree={desk.isFree} filled={!desk.isSelected}
          >{desk.num}</DeskMark
        >
      </button>
    {/each}
    <div class="h-full flex flex-col justify-center">
      {#if editorMode}
        <div
          class="absolute opacity-75 cursor-default pointer-events-none"
          style:left={`${deskMarkCursorPosX}px`}
          style:top={`${deskMarkCursorPosY}px`}
          style:display={deskMarkCursorShow ? 'block' : 'none'}
        >
          <DeskMark size={deskMarkSize} isFree={true} filled={true} />
        </div>
      {/if}

      <span class="text-4xl font-bold">{roomName}</span>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <img
        on:load={calculateCoordSystems}
        bind:this={img}
        on:click={addDesk}
        src={imgUrl}
        class="object-contain max-w-full max-h-full img-height w-auto h-auto mt-2"
        alt="room"
      />
    </div>
  </div>
{:else}
  <p>Загрузка...</p>
{/if}

<style>
  .img-height {
    max-height: calc(100% - 50px);
  }
</style>
