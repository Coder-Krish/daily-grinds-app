import React, { useRef } from 'react';
import './styles.css'

interface Props {
    grind: string;
    setGrind: React.Dispatch<React.SetStateAction<string>>;
    handleGrindAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ grind, setGrind, handleGrindAdd }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <form className='input' onSubmit={(e) => {
            handleGrindAdd(e)
            inputRef.current?.blur();
            }
            }>
            <input
                ref={inputRef} 
                type="input" 
                value={grind} 
                onChange = {
                    (e) => setGrind(e.target.value)
                }
                 placeholder='Enter grind' className='input__box' />
            <button className='input__submit' type='submit'>Grind</button>
        </form>
    )
}

export default InputField;