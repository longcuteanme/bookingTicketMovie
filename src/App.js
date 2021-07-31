import './App.css';
import {Router,Switch, Route} from "react-router-dom";
import {createBrowserHistory} from "history"
import PageNotFound from './components/PageNotFound/PageNotFound';
import { TrangNguoiDung } from './templates/trangNguoiDung/TrangNguoiDung';
import TrangQuanTri from './templates/trangQuanTri/TrangQuanTri'
import Loading from './components/loading/Loading';
import Home from './pages/Home/Home';
import ChiTiet from './pages/ChiTiet/ChiTiet';
import ModalItem from './components/ModalItem/ModalItem';
import DatVe from './pages/DatVe/DatVe';
import LoginRegister from './pages/LoginRegister/LoginRegister';
import TaiKhoan from './pages/TaiKhoan/TaiKhoan';
import { menuList } from './templates/trangQuanTri/MenuList/configMenu';


const history= createBrowserHistory()

function App() {
  return (
    <Router history={history}>
      <ModalItem/>
      <Loading/>
      <Switch>
        <TrangNguoiDung path='/' exact Component={Home}/>
        <TrangNguoiDung path='/ChiTiet/:id' Component={ChiTiet}/>
        <TrangNguoiDung path='/DatVe/:id' Component={DatVe}/>
        <TrangNguoiDung path='/TaiKhoan' exact Component={TaiKhoan}/>
        <Route path='/Login' exact component={LoginRegister}/>
        {menuList.map((item)=>{
          if(item.children){
            return item.children.map((item2)=>{
              return <TrangQuanTri path={`/QuanTri${item.path}${item2.path}`} exact Component={item2.Component}/>
            })
          }
          else{
            return <TrangQuanTri path={`/QuanTri${item.path}`} exact Component={item.Component}/>
          }
        })}
        <TrangNguoiDung path='*' Component={PageNotFound}/>
      </Switch>
    </Router>
  );
}

export default App;
