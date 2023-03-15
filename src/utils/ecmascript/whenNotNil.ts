import { isNil, none, when } from 'ramda'

export default function whenNotNil(callback: (deps: any[]) => void, deps: any[]) {
  when(none(isNil), callback)(deps)
}
