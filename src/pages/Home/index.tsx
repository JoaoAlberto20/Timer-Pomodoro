import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'
import { HandPalm, Play } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

import {
  CountDownContainer,
  FomContainer,
  HomeContainer,
  MInuteAmountInput,
  Separator,
  StartCountdownButton,
  StopCountDownButton,
  TasksInputs,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'INforma a tarefa'),
  minutesAmount: zod.number().min(1).max(60),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondPassed, setAmountSecondPasses] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    const id = String(new Date().getTime())

    const newCycles: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycles])
    setActiveCycleId(id)
    setAmountSecondPasses(0)
    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSecond = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSecond = activeCycle ? totalSecond - amountSecondPassed : 0

  const minuteAmount = Math.floor(currentSecond / 60)
  const secondsAmount = currentSecond % 60

  const minutes = String(minuteAmount).padStart(2, '0')
  const second = String(secondsAmount).padStart(2, '0')

  const task = watch('task')
  const isSubmitDisabled = !task

  const handleInterruptCycles = () => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondDiference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )
        if (secondDiference >= totalSecond) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
          )

          setAmountSecondPasses(totalSecond)
          clearInterval(interval)
        } else {
          setAmountSecondPasses(secondDiference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSecond, activeCycleId])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${second}`
    }
  }, [minutes, second, activeCycle])

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FomContainer>
          <label htmlFor="tasks">Vou trabalhar em </label>
          <TasksInputs
            id="tasks"
            list="tasks-suggestions"
            placeholder="Dê um nome para o seu projeto"
            disabled={!!activeCycle}
            {...register('task')}
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
            min={1}
            max={60}
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>Minutos..</span>
        </FomContainer>

        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{second[0]}</span>
          <span>{second[1]}</span>
        </CountDownContainer>

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={handleInterruptCycles}>
            <HandPalm size={24} />
            <span>Interromper</span>
          </StopCountDownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            <span>Começar</span>
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
