import { createContext, useState, useEffect } from 'react';

const VehicleContext = createContext();

export const VehicleProvider = ( {children} ) => {

    

    return(
        <VehicleContext.Provider value={{}}>
            {children}
        </VehicleContext.Provider>
    );
}

export default VehicleContext;