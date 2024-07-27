<script lang="ts">
  import RoomView from '$lib/room-view.svelte';
  import Wrapper from '$lib/wrapper.svelte';
  import type { PageData } from './$types';

  type SelectedTime = {
    startHours: number | null;
    startMinutes: number | null;
    endHours: number | null;
    endMinutes: number | null;
  };

  export let data: PageData;

  let selectedDeskNum: number | null = null;
  let selectedTime: SelectedTime | null = null;

  function selectTime() {
    selectedTime = {
      startHours: 18,
      startMinutes: 0,
      endHours: 20,
      endMinutes: 0
    };
  }
</script>

<Wrapper>
  <RoomView
    bind:selectedDeskNum
    roomName={data.name}
    desks={data.desks}
    imgUrl={data.imgUrl}
    editorMode={false}
  />

  <div slot="sidebar" class="flex flex-col justify-between height h-full mt-2">
    {#if selectedDeskNum === null}
      <div>
        <span class="text-white text-xl font-semibold leading-3"
          >Нажмите на метку для просмотра информации о столе</span
        >
      </div>
      <a
        href="/create-room"
        class="text-center p-2 bg-indigo-500 rounded-lg text-xl text-white hover:bg-indigo-400 disabled:opacity-75 transition duration-100 font-semibold"
        >Создать комнату</a
      >
    {:else}
      <div class="mt-2">
        <span class="text-3xl text-white font-black">Стол #{selectedDeskNum}</span>
        {#if selectedTime === null}
          <div class="mt-4">
            <button
              on:click={selectTime}
              class="bg-green-400 transition duration-100 hover:bg-green-300 rounded-t-lg w-full text-left px-8 py-4"
            >
              <div class="font-bold text-xl">Свободен до 18</div>
              <div>Нажмите, чтобы занять это время</div>
            </button>
            <div class="bg-amber-400 px-8 py-4">
              <div class="font-bold text-xl">Занят с 18:00 до 20:00</div>
              <div>Никита Рыданов</div>
            </div>
            <button
              on:click={selectTime}
              class="bg-green-400 transition duration-100 hover:bg-green-300 w-full text-left px-8 py-4"
            >
              <div class="font-bold text-xl">Свободен c 20:00 до 20:30</div>
              <div>Нажмите, чтобы занять это время</div>
            </button>
            <div class="bg-amber-400 px-8 py-4">
              <div class="font-bold text-xl">Занят с 20:30 до 21:30</div>
              <div>Михаил Чернигин</div>
            </div>
            <button
              on:click={selectTime}
              class="bg-green-400 transition duration-100 hover:bg-green-300 rounded-b-lg w-full text-left px-8 py-4"
            >
              <div class="font-bold text-xl">Свободен с 21:30</div>
              <div>Нажмите, чтобы занять это время</div>
            </button>
          </div>
          <button
            class="p-2 mt-3 w-full bg-indigo-500 rounded-lg text-xl text-white enabled:hover:bg-indigo-400 disabled:opacity-75 transition duration-100 font-semibold"
            on:click={() => (selectedDeskNum = null)}
          >
            Назад
          </button>
        {:else}
          <form class="flex flex-col mt-2">
            <label for="start-time" class="text-white text-xl mb-2 font-bold"
              >Время бронирования</label
            >
            <div class="flex justify-between items-center">
              <input
                type="text"
                id="room-name"
                class="p-2 w-28 text-center text-xl rounded-lg outline-none"
                placeholder="18:00"
                value="18:00"
              />
              <div class="h-1 w-10 bg-white rounded-full"></div>
              <input
                type="text"
                id="room-name"
                class="p-2 w-28 text-center text-xl rounded-lg outline-none"
                placeholder="18:00"
                value="20:00"
              />
            </div>
            <button
              type="submit"
              class="p-2 mt-3 bg-green-500 rounded-lg text-xl text-white enabled:hover:bg-green-400 disabled:opacity-75 transition duration-100 font-semibold"
              on:click={() => {
                selectedTime = null;
                selectedDeskNum = null;
              }}
            >
              Забронировать
            </button>
            <button
              class="p-2 mt-3 bg-indigo-500 rounded-lg text-xl text-white enabled:hover:bg-indigo-400 disabled:opacity-75 transition duration-100 font-semibold"
              on:click={() => (selectedTime = null)}
            >
              Назад
            </button>
          </form>
        {/if}
      </div>
    {/if}
  </div>
</Wrapper>
