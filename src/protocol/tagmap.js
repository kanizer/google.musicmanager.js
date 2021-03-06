var tagmap = (function () {
  
  function id(x) { return x }
  function attrgetter(name, f) { return function (x) { return f(x[name]) } }
  function parseYear(s) { return parseInt(s.slice(0,4)) }
  function stripNull(x) { return x.replace(/\0$/, '') }
  
  function cut(i) {
    return function (x) {
      var y = parseInt(x.split('/')[i]);
      return isNaN(y) ? undefined : y;
    }
  }
  
  return {
    /* TIT2 */ "title": { "title": stripNull },
    /* TALB */ "album": { "album": stripNull },
    /* TPE1 */ "artist": { "artist": stripNull },
    /* TPE2 */ "albumArtist": { "album_artist": stripNull },
    /* TCOM */ "composer": { "composer": stripNull },
    /* TCON */ "genre": { "genre": stripNull },
    /* PCNT */ "playCount": { "play_count": parseInt },
    /* TCMP */ "compilation": { "compilation": Boolean },
    /* TBPM */ "tempo": { "beats_per_minute": parseInt },
    /* TYER */ "year": { "year": parseInt },
    /* TDRL */ "releaseTime": { "year": parseYear },
    /* TDRC */ "recordingTime": { "year": parseYear },
    /* COMM */ "comments": {
      "comment": function (x) {
        if (Array.isArray(x)) { x = x[0] || {}; }
        return stripNull(x.value || "");
      },
    },
    /* TRCK */ "trackNumber": {
      "track_number": cut(0),
      "total_track_count": cut(1),
    },
    /* TPOS */ "diskNumber": {
      "disc_number": cut(0),
      "total_disc_count": cut(1),
    },
    /* APIC */ "coverArt": { "album_art_ref": attrgetter('data', id) },
    /* POPM */ "rating": {
      "play_count": attrgetter('counter', parseInt),
      "rating": function (x) {
        if (x.rating === 0) { return 1; }
        return Math.round(x.rating / 64) + 2;
      },
    },
  };
})();
