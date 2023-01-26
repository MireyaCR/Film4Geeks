import React, { useEffect } from "react";
import '../../img/spiderman.png'
import '../../img/super.png'
import '../../img/superw.png'


export const Starring = () => {

    useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])
      
  return (
    <div className='container text-center mt-5'>
        <div className='d-flex justify-content-around flex-wrap'>
            <div>
                <div className='card mt-2' style={{width: '19rem', height: '19rem', background: 'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(29,9,121,0.8379726890756303) 8%, rgba(0,212,255,1) 100%)'}}>
                    <div style={{marginTop: '30px'}}>
                        <img src='spiderman.png' style={{height: '13rem', objectFit: 'contain'}}/>   
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
                <div className='card mt-2' style={{width: '19rem', height: '19rem', background: 'radial-gradient(circle, rgba(127,130,56,1) 0%, rgba(2,0,36,1) 56%, rgba(86,148,161,1) 100%)'}}>
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
                <div className='card mt-2' style={{width: '19rem', height: '19rem', background: 'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(127,130,56,1) 3%, rgba(86,148,161,1) 100%)'}}>
                     <div style={{marginTop:'30px'}}>
                        <img src='superw.png' style={{height: '13rem', objectFit: 'contain'}}/>   
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
