import './VinylPlayer.css'
import vinylImg from '../assets/vinyl.png'
import playPinImg from '../assets/play pin.png'

export function VinylPlayer() {
  return (
    <div className="record-player">
      <img src={vinylImg} alt="Vinyl record" className="record-player-vinyl" />
      <img src={playPinImg} alt="Tonearm" className="record-player-pin" />
    </div>
  )
}
