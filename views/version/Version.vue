<template>
    <p>{{greeting}} world!</p>
</template>

<<script>
module.exports = {
  data: function () {
      return {
          greeting: 'Helll'
      }
  }
}
</script>

<<style >
p {
    font-size: 2em;
    text-align: center;
}
</style>


