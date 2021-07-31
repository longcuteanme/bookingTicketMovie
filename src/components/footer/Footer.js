import React, { Component } from 'react'
import backgroundFooter from '../../assets/images/backgroundFooter.jpg'
import {PhoneOutlined,UserOutlined,MailOutlined,GithubOutlined} from '@ant-design/icons'

export default class Footer extends Component {
    render() {
        return (
            <div className="h-auto w-screen bg-cover bg-cente py-24 px-52" id="footer" style={{backgroundImage:`url(${backgroundFooter})`}}>
                <div className="w-full text-white grid grid-cols-2">
                    <div className="Info">
                        <h1 className="text-white text-3xl">Info contact</h1>
                        <table>
                            <tr>
                                <td className="p-2"><UserOutlined style={{color:'white', fontSize:'30px'}}/></td>
                                <td className="text-lg p-2">Trịnh Văn Long - 23y</td>
                            </tr>
                            <tr>
                                <td className="p-2"><PhoneOutlined style={{color:'white', fontSize:'30px'}}/></td>
                                <td className="text-lg p-2">0384912727</td>
                            </tr>
                            <tr>
                                <td className="p-2"><MailOutlined style={{color:'white', fontSize:'30px'}}/></td>
                                <td className="text-lg p-2">psatrinhlongat48@gmail.com</td>
                            </tr>
                        </table>
                    </div>
                    <div className="congNghe ">
                        <h1 className="text-white text-3xl">Công nghệ sử dụng</h1>
                        
                    </div>
                </div>
                <hr className="my-5" style={{color:'white', border:'1px solid'}}/>
                <table className="m-auto">
                    <tr>
                        <td><GithubOutlined style={{color:'white', fontSize:'20px', padding:'5px'}}/></td>
                        <td className="text-sm text-white p-2">https://github.com/longcuteanme/bookingTicketMovie</td>
                    </tr>
                </table>
                    

            </div>
        )
    }
}
