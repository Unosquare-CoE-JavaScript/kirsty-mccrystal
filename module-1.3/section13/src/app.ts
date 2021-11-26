import axios from 'axios'

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

// NEED A CREDIT CARD FOR AN API KEY
const GOOGLE_API_KEY = ''

type GoogleGeocodingRes = {
  results: {geometry: {location: {lat: Number, lng: number}}}[]
  status: 'OK' | 'ZERO_RESULTS'
}

function searchAddress(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  // can't use google api cause of requirment for credit card
  axios.get<GoogleGeocodingRes>(`some url ${encodeURI(enteredAddress)}`)
  .then(res => {
    if (res.data.status !== 'OK') {
      throw new Error('Could not fetch location!')
    }
    const coordinates = res.data.results[0].geometry.location;
  })
  .catch(err => console.log(err));

}

form.addEventListener('submit', searchAddress);