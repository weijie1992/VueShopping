function createWatchObject(props, handler) {
  return Object.fromEntries(
    props.map((prop) => [
      `${prop}`,
      {
        handler,
        deep: true,
      },
    ])
  )
}
export { createWatchObject }
