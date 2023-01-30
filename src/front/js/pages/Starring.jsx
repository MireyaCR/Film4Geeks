import React, { useEffect } from "react";
import '../../img/spiderman.png'
import '../../img/super.png'
import '../../img/fenix.png'
import '../../styles/starring.css'

export const Starring = () => {

    useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])
      
  return (
    <div className='container text-center mt-5'>
        <div className='d-flex justify-content-around flex-wrap'>
            <div>
                <div className='card cardspiderman mt-2'>
                    <div style={{marginTop: '30px'}}>
                        <img src='spiderman.png' style={{height: '13rem', objectFit: 'contain'}}/>   
                    </div>
                </div>
                <div className='mt-2'>
                    <h6 className="text-info">David Galisteo Pujol</h6>
                    <p className="coceo">Co-Founder & CEO, Films4Geeks</p>
                    <p className="coceo">Lead developer</p>
                    <h6>Linkedin: </h6>
                </div>
            </div>
            <div>
                <div className='card cadrsuperman mt-2'>
                    <div style={{marginTop:'30px'}}>
                        <img src='super.png' style={{height: '13rem', objectFit: 'contain'}}/>   
                    </div>
                </div>
                <div className='mt-2'>
                    <h6 className="text-info">Jack Caldwell-Nichols</h6>
                    <p className="coceo">Co-Founder & CEO, Films4Geeks</p>
                    <p className="coceo">Lead developer</p>
                    <h6>Linkedin: </h6>
                </div>
            </div>
            <div className="mb-5">
                <div className='card cardfenix mt-2'>
                     <div style={{marginTop:'30px'}}>
                        <img src='fenix.png' style={{height: '13rem', objectFit: 'contain'}}/>   
                    </div>
                </div>
                <div className='mx-auto mt-2'>
                    <h6 className="text-info">Mireya De La Corte Ríos</h6>
                    <p className="coceo">Co-Founder & CEO, Films4Geeks </p>
                    <p className="coceo">Lead developer</p>
                    <h6>Linkedin: </h6>
                </div>
            </div>        
        </div>    
    </div>
  )
}
