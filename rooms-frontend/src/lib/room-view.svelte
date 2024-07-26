<script lang="ts">
  import DeskMark from './desk-mark.svelte';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
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

  let img: HTMLImageElement | undefined;

  let coordSystemX: CoordSystem = defaultCoordSystem();
  let coordSystemY: CoordSystem = defaultCoordSystem();

  let size: number = 0;

  $: desksWithTransformatedPositions = desks.map((d) => ({
    ...d,
    posX: transformCoordSystem({ pos: d.posX, ...coordSystemX }),
    posY: transformCoordSystem({ pos: d.posY, ...coordSystemY })
  }));

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

    size = (imgRect?.height || 0) * 0.07;
  }

  onMount(() => {
    img?.addEventListener('load', () => {
      calculateCoordSystems();
    });

    window.addEventListener('resize', () => {
      calculateCoordSystems();
    });
  });

  function onClickImg(e: MouseEvent) {
    const posX = transformCoordSystemBack({ pos: e.clientX, ...coordSystemX });
    const posY = transformCoordSystemBack({ pos: e.clientY, ...coordSystemY });
    console.log(Math.max(...desks.map((d) => d.num)));
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
</script>

{#if browser}
  <div class="h-full">
    {#each desksWithTransformatedPositions as desk (desk.num)}
      <div class="absolute" style:left={`${desk.posX}px`} style:top={`${desk.posY}px`}>
        <DeskMark {size} isFree={true} filled={true}>{desk.num}</DeskMark>
      </div>
    {/each}
    <div class="h-full flex flex-col justify-center">
      <span class="text-4xl font-bold">{roomName}</span>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <img
        bind:this={img}
        src={imgUrl}
        class="object-contain max-w-full max-h-full img-height w-auto h-auto mt-2"
        alt="room"
        on:click={onClickImg}
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
