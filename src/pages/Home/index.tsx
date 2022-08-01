import { Play } from 'phosphor-react'
import {
  CountDownContainer,
  FomContainer,
  HomeContainer,
  MInuteAmountInput,
  Separator,
  StartCountdownButton,
  TasksInputs,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FomContainer>
          <label htmlFor="tasks">Vou trabalhar em </label>
          <TasksInputs
            id="tasks"
            list="tasks-suggestions"
            placeholder="Dê um nome para o seu projeto"
          />

          <datalist id="tasks-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>

          <label htmlFor="minutesAmount">Durante</label>
          <MInuteAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
          />

          <span>Minutos..</span>
        </FomContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountdownButton type="submit" disabled>
          <Play size={24} />
          <span>Começar</span>
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
