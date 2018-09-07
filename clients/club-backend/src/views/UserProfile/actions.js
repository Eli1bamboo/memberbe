import { request } from '../../utils'

export const FETCH_FILM_SEARCHING = 'FETCH_FILM_SEARCHING'
export const FETCH_FILM_SEARCHED = 'FETCH_FILM_SEARCHED'
export const FETCH_FILM_FAILED = 'FETCH_FILM_FAILED'

export const FETCH_DETAIL_SEARCHING = 'FETCH_DETAIL_SEARCHING'
export const FETCH_DETAIL_SEARCHED = 'FETCH_DETAIL_SEARCHED'

export const fetchFilm = () => {
  return (dispatch, getState, api) => {
    dispatch({
      type: FETCH_FILM_SEARCHING,
      text: 'Build my first Redux app'
    })
    request(`${api}/films`, 'GET')
      .then((response) =>
        dispatch({
          type: FETCH_FILM_SEARCHED,
          payload: {
            results: response.results
          }
        })
      )
      .catch((err) => console.log(err))
  }
}

export const fetchDetail = (url) => {
  return (dispatch, getState, api) => {
    dispatch({
      type: FETCH_DETAIL_SEARCHING,
      text: 'Build my first Redux app'
    })
    request(url, 'GET').then((response) =>
      dispatch({
        type: FETCH_DETAIL_SEARCHED,
        payload: response
      })
    )
  }
}
