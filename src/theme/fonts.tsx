import { Global, css } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
      /* Circular SP */

      @font-face {
        font-family: 'CircularSP black';
        font-style: 'normal';
        fontWeight: '600';
        font-display: 'swap';
        src: url('../fonts/CircularSP/CircularSpotifyText-Black.otf') format('otf')
      }
    `}
  />
);

export default Fonts;