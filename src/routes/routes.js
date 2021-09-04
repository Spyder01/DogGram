import exploreBreed from '../views/ExploreBreed'
import Breed from '../views/Breed'
import Pic from '../views/Pic'

const routes = [
    { 
        path: '/', 
        component: exploreBreed,
        exact: true
    },
    {
        path: '/breed/:id', 
        component: Breed,
        exact: true
    },
    {
        path: '/pic/:image', 
        component: Pic,
        exact: true

    }
]

export default routes;