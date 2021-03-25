import { createAction, nanoid} from '@reduxjs/toolkit'


export const setbet = createAction('main/setLoad', function(load) {    
    return {
        payload: {
        load,
          id: nanoid(),
          createdAt: new Date().toISOString(),
        },
      }
    }) 