import  {UserState} from '../slices/authSlice'
import { ThemeState } from '../slices/themeSlice'

interface RootState{
  user:UserState,
  theme:ThemeState
}
export default RootState