import React from 'react'
import OrdenSummary from '../../components/store/OrdenSummary'
import DeliveryForm from '../../components/store/DeliveryForm'
import PrimaryButton from '../../components/common/PrimaryButton'

const CheckoutPage = () => {
  return (
       <div className='mainPage d-flex flex-row justify-between'>

        <div>
            <h2>Tu pedido</h2>
            <OrdenSummary />
            <PrimaryButton text="Confirmar y pagar" />
        </div>

         <div>
            <h2>Informacion del cliente</h2>
            <DeliveryForm />
        </div>

      
    </div>
  )
}

export default CheckoutPage
