import CodeIcon from '@mui/icons-material/Code';
import CodeOffIcon from '@mui/icons-material/CodeOff';

function SwitchIconOn() {
    return(
        <div className='p-2 w-full h-full flex justify-center items-center'>
        <CodeIcon />
        </div>
    )
}

function SwitchIconOff() {
    return(
        <div className='p-2 w-full h-full flex justify-center items-center'>
        <CodeOffIcon />
        </div>
    )
}

export { SwitchIconOn, SwitchIconOff};