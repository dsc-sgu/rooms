<script lang="ts">
  export let num: number;
  export let isFree: boolean;
  export let filled: boolean;

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
  class={'w-20 h-20 rounded-full flex justify-center items-center font-bold text-3xl ' + classes()}
>
  {num}
</div>
