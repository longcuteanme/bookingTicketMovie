import { Route } from 'react-router-dom'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

export const TrangNguoiDung= (props)=>{
    const {Component,...restProps}=props
    return (
        <Route {...restProps} render={(propsRoute)=>{
            return(
                <div>
                    <Header/>
                    <div className="mt-20">
                        <Component {...propsRoute}/>
                        <Footer/>
                    </div>
                </div>
            )
            
        }}/>
    )
}