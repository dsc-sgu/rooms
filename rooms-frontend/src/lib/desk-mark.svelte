<script lang="ts">
  export let isFree: boolean;
  export let filled: boolean;
  export let size: number;

  function classes() {
    if (filled) {
      return isFree ? 'bg-green-300 hover:bg-green-200' : 'bg-amber-300 hover:bg-amber-200';
    } else {
      return (
        'border-4 ' +
        (isFree
          ? 'border-green-400 text-green-400 hover:border-green-300 hover:text-green-300'
          : 'border-amber-400 text-amber-400 hover:border-amber-300 hover:text-amber-300')
      );
    }
  }
</script>

<div
  class={'size rounded-full flex justify-center items-center font-bold 2xl:text-3xl xl:text-xl text-sm select-none transition duration-100 ' +
    classes()}
  style:width={`${size}px`}
  style:height={`${size}px`}
>
  <slot></slot>
</div>
