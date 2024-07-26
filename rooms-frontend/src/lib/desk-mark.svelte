<script lang="ts">
  export let num: number;
  export let isFree: boolean;
  export let filled: boolean;
  export let size: number;

  function classes() {
    if (filled) {
      return isFree ? 'bg-green-300' : 'bg-amber-300';
    } else {
      return (
        'border-4 ' +
        (isFree ? 'border-green-400 text-green-400' : 'border-amber-300 text-amber-400')
      );
    }
  }
</script>

<div
  class={'size rounded-full flex justify-center items-center font-bold 2xl:text-3xl xl:text-xl text-sm ' +
    classes()}
  style:width={`${size}px`}
  style:height={`${size}px`}
>
  {num}
</div>
