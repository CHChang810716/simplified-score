
var MusicTheory_ = {

  KEY_ID_MAP_KEY: [7, 1, 0, 2, 0, 3, 4, 0, 5, 0, 6, 0, 7], 
  KEY_ASCENT: {
    SHARP: 1, // #
    FLAT: 0, // b
    NONE: 2
  },
  KEY_ASCENT_SIGN: ['\u266D', '\u266F', '']
};

/**
 * @param key_id int 0 ~ 12
 * @param ascent_hint int 0 => down, 1 =>up
 */
MusicTheory_.keyIdToKeyAscent = ( key_id, ascent_hint  ) => {
  // console.log(key_id);
  if ( MusicTheory_.KEY_ID_MAP_KEY[key_id] === 0 ){
    if( ascent_hint === MusicTheory_.KEY_ASCENT.SHARP){
      return {
        key: MusicTheory_.KEY_ID_MAP_KEY[key_id - 1], 
        ascent: MusicTheory_.KEY_ASCENT.SHARP
      }
    } else {
      return {
        key: MusicTheory_.KEY_ID_MAP_KEY[key_id + 1],
        ascent: MusicTheory_.KEY_ASCENT.FLAT
      }
    }
  } else {
    return {
      key: MusicTheory_.KEY_ID_MAP_KEY[key_id],
      ascent: MusicTheory_.KEY_ASCENT.NONE
    }
  }
};
  /* 
  tonal mapping
  A0 => 21
  B0 => 23
  C1 => 24
  D1 => 26
  ...

  */
MusicTheory_.midiToKeyAscent = (midi_id, tonal, ascent_hint) => {
  let key_diff = midi_id - tonal;
  let key_id = ( key_diff + 1 )% 12 ;
  if ( key_id < 0 ) key_id += 12;
  console.log("key_diff: ", key_diff);
  console.log("key_id: ", key_id);
  let octave = key_diff < 1 
    ? Math.trunc( (key_diff - 11) / 12 )
    : Math.trunc(key_diff / 12)
  ;
  console.log("octave: ", octave);
  let key_as = MusicTheory_.keyIdToKeyAscent(key_id, ascent_hint);
  let res = Object.assign( key_as, { octave: octave } );
  return res;
}
const MusicTheory = MusicTheory_;
export default MusicTheory;