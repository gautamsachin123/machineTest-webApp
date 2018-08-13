import LoginSaga from './login/sagas'
import CountriesSaga from './countries/saga'

export default function* IndexSaga () {
  yield [
    LoginSaga(),
    CountriesSaga()
    //import saga
  ]
}
