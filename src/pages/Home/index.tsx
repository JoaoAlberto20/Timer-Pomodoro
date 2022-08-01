export function Home() {
  return (
    <div>
      <form action="">
        <label htmlFor="tasks">Vou trabalhar em </label>
        <input id="tasks" />

        <label htmlFor="minutesAmount">Durante</label>
        <input type="number" id="minutesAmount" />
      </form>
    </div>
  )
}
