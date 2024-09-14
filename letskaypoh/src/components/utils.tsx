import './styles.css'

export const commaSeparatedArray = (arr: (string | JSX.Element)[] | undefined) => {
    if (!arr || arr.length === 0) return
    
    const items = arr.map((elem, index) => {
        return (
            (arr.length === index+1) ? 
            <span>{elem}</span> : 
            <span className={'commaArrayElement'}>{elem}, </span>
        )
    })
    return items
}