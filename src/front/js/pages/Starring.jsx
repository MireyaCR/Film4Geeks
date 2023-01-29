import React, { useEffect } from "react";
import '../../img/spiderman.png'
import '../../img/super.png'
import '../../img/fenix.png'


export const Starring = () => {

    useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])
      
  return (
    <div className='container text-center mt-5'>
        <div className='d-flex justify-content-around flex-wrap'>
            <div>
                <div className='card mt-2' style={{width: '16rem', height: '16rem', background: 'radial-gradient(circle, rgb(242 63 97) 0%, rgb(245 64 90) 10%, rgb(10, 25, 41) 65%)',borderRadius: '50%'}}>
                    <div style={{marginTop: '30px'}}>
                        <img src='spiderman.png' style={{height: '13rem', objectFit: 'contain',marginTop:'1px'}}/>   
                    </div>
                </div>
                <div className='mt-3'>
                    <h6>David Galisteo Pujol</h6>
                    <h6>Co-Founder & CEO, Films4Geeks</h6>
                    <h6>Lead developer</h6>
                    <h6>Linkedin: </h6>
                </div>
            </div>
            <div>
                <div className='card mt-2' style={{width: '16rem', height: '16rem', background: 'radial-gradient(circle, #95d3f5 0%, #95d3f5 6%, rgb(10, 25, 41) 60%)',borderRadius: '50%'}}>
                    <div style={{marginTop:'30px'}}>
                        <img src='super.png' style={{height: '13rem', objectFit: 'contain'}}/>   
                    </div>
                </div>
                <div className='mt-2'>
                    <h6>Jack Caldwell-Nichols</h6>
                    <h6>Co-Founder & CEO, Films4Geeks</h6>
                    <h6>Lead developer</h6>
                    <h6>Linkedin: </h6>
                </div>
            </div>
            <div>
                <div className='card mt-2' style={{width: '16rem', height: '16rem', background: 'radial-gradient(circle, rgb(210, 148, 53) 0%, rgba(210, 148, 53, 45) 6%, rgb(10, 25, 41) 60%)',borderRadius: '50%'}}>
                     <div style={{marginTop:'30px'}}>
                        <img src='fenix.png' style={{height: '13rem', objectFit: 'contain'}}/>   
                    </div>
                </div>
                <div className='mt-2'>
                    <h6>Mireya De La Corte Ríos</h6>
                    <h6>Co-Founder & CEO, Films4Geeks</h6>
                    <h6>Lead developer</h6>
                    <h6>Linkedin: </h6>
                </div>
            </div>
           
               
        </div>    
    </div>
  )
}
