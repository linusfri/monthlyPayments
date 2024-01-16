type InputSum<T> = {
    setState?: React.Dispatch<React.SetStateAction<T>>,
    stateUpdateFn?: (entity: T, index: number) => void,
    index?: number, 
    entity: T,
}

export default InputSum;
