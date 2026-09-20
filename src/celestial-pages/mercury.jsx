import React, { useState } from 'react'
import '../.components/mystic.css';

export default function Mercury() {
  const asciiArt = `                                                                  
                                x                                 +.                                
                                &;                               .&:                                
                                &&.                              $&.                                
                                $&&.                            X&&                                 
                                :&&&;                         .$&&x                                 
                                 X&&&X.                      ;&&&&.                                 
                                  X&&&&x                   :&&&&&:                                  
                                   +&&&&&&:             .X&&&&&$.                                   
                                    :$&&&&&&&&X;:::;+$&&&&&&&&+                                     
                                      :&&&&&&&&&&&&&&&&&&&&&+                                       
                                       :&&&&&&&&&&&&&&&&&&&x                                        
                                     :&&&&&&&&$XXXXX$&&&&&&&&X.                                     
                                   .X&&&&&&:            X&&&&&&+                                    
                                  .&&&&&&                 $&&&&&+                                   
                                  &&&&&x                   ;&&&&&;                                  
                                 $&&&&X.                    +&&&&&.                                 
                                .&&&&&+                     .&&&&&x                                 
                                +&&&&&;                     .X&&&&&                                 
                                x&&&&&;                     .X&&&&&                                 
                                +&&&&&+                     :&&&&&&                                 
                                .&&&&&&:                    X&&&&&x                                 
                                 $&&&&&&:                  X&&&&&&.                                 
                                  &&&&&&&x               ;&&&&&&&;                                  
                                  .&&&&&&&&$;         :x&&&&&&&&+                                   
                                   .$&&&&&&&&&&$XxX$&&&&&&&&&&&;                                    
                                     :&&&&&&&&&&&&&&&&&&&&&&&+                                      
                                       :X&&&&&&&&&&&&&&&&&$;                                        
                                          :+x&&&&&&&&&X+:                                           
                                              ;&&&&&X                                               
                                              .$&&&&x                                               
                                              .X&&&$;                                               
                                               X&&$$:                                               
                                   +$$Xx+;.    x$$$X.    .:;++++.                                   
                                   x&&&&&&&&&$$$$$$$$XXXXXXXXXXX.                                   
                                   x&&&&&&&&&$$$$$$$$XXXXXXXXXXx.                                   
                                   x&&&&&&&$$$$$$$$$$XXXXXXXXXXx.                                   
                                   +Xx;::..    x$$$X;    ..:;+xx.                                   
                                               x$$$X;                                               
                                              .x$$XX+                                               
                                              :X$X$X+                                               
                                              ;X$XXXx                                               
                                              ;XXXXXx                                               
                                              ;XXXXXx                                               
                                              ;XXXXXx.                                              
                                              +XXXXXx.                                              
                                              +XXXXXx:                                              
                                             .;xxxxxx:                                              
                                                                                              
                                                                                                    
                                                        
`;

  return (
    <div
      style={{
        background: 'hsl(270, 5%, 7%)',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100vw',
      }}
    >
      <div className="mystic-card theme-mercury" style={{ width: 'fit-content', minWidth: '40rem', margin: '5rem' }}>
        <div className="card-letter">Mercury</div>
        <div className="corner top left"></div>
        <div className="corner top right"></div>
        <div className="corner bottom left"></div>
        <div className="corner bottom right"></div>

        <div className="card-corner-letter top-left">I</div>
        <div className="card-corner-letter bottom-right">I</div>

        <p style={{ lineHeight: '1.5', marginBottom: '1rem', textAlign: 'center' }}>
          This wreath of knowledge, more vast than any wealth my people's known, <br />
          accessed by a simple key in to this universal keyhole, <br />
          more advance than any of my vaults: <br />
        </p>

        <div className="keyhole-wrapper" style={{ lineHeight: '1.5', marginBottom: '1rem', textAlign: 'center' }}>
          <code>https://drive.google.com/file/d/&lt;key&gt;</code>
        </div>

        <p style={{ lineHeight: '1.5', marginBottom: '1rem', textAlign: 'center' }}>
          Sigh, its uncharacteristic of me to lose the message she entrusted me with, <br />
          especially with this beast I was gifted befitting of me.
        </p>

        <p style={{ lineHeight: '1.5', marginBottom: '1rem', textAlign: 'center' }}>
          I suspect that it was swallowed by that gate to hell.
        </p>

        <pre
            style={{
              fontFamily: '"Courier New", Courier, monospace',
              lineHeight: '1.0',
              fontSize: '0.8rem',
              color: 'var(--mystic-border, #e0e7ff)',
              textShadow: '0 0 6px var(--mystic-border, rgba(224, 231, 255, 0.4))',
              margin: '1rem auto -1rem auto',
              userSelect: 'none',
              textAlign: 'center',
            }}
          >
          {asciiArt}                            
        </pre>
      </div>
    </div>
    
  )
}