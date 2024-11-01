import { useContext } from "react"
import { EventContext, EventContextType } from '../context/EventContextProps'


export const useEventContext = (): EventContextType => {
    const context = useContext(EventContext);
    if(!context) {
        throw new Error('useEventContext must be used within an EventProvider');
    }
     return context
}