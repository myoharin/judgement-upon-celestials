import React, { useState } from 'react'
import '../.components/mystic.css';

export default function Venus() {
  const asciiArt = `
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                              .                                                     
                                           ....                                                     
                                          .:-.                                                      
                                         -+                                                         
                                       :**............                                              
                                      - -=-:-------::::.. .                                         
                                    .:::::::.   .-++++++=-:..                                       
                          :       .:=+===-:-::::.::::::---=**-...                                   
                        .-:   .-+==+=====-=----:::--:::-:..:-+*-..          .                       
                       .-+:---+*+++=====-----------------.   :-*+:..        .:.                     
                      :=++:-=*#+=++====----------=----:-:.    .-**:           :                     
                     :-=+=-=+#*++====+=----==-=--====----      :+#=:.         ..                    
                  ..:--+*==+*#++==============---===---:..      -*#:.          .                    
                ...::-=+ --.-=+=-=-.    :====-=======---:.      :+#-.                               
                 :::-==  -.-+*+=.:+*+*+=   ==========--:.:    .:-+#-.                               
               ..::-=+.  .:-=** -=+++++**=  :=========-::......:-+#-.       :                       
              ..::--=+-  :--+*#====++++***+  :=+======---::::::-=*#-.      :+.                      
              ..::--+== .:=++#%+===+++++***:  =+=+++===--------=+*#-...  :=-                        
               ..---+==-:-+**#%*====++++****  -=+=++===-==-----=*#*-:.::-.                          
               ..:--+==-:-=+*#%%+===+++****+  -++++++========++*#%+=-:                              
               ..:-=++==:-=**#%%%+===++****   ++*+++++++==+++**#%*.                                 
                .:--=+==-.::=+*%%%*=+=++**.  .++++++++++++**##+.                                    
                 ::-===--...:-+*%%%*+++++    *****++++****#-                                        
                 :-:===--....:-++#*##++.   -**********#*-                                           
                  ---=-:.  ...:======     ++*********-                                              
                     :-.    ...:--.    .##****####=.              ::                                
                             ..:      .-+*##*##*:             =##+-:                                
                                       :-=++*=.            ==+**#+-.                                
                                 .:     .:--            +=----=+*+.                                 
                                :-:.   ...           +*+=:::.  :+*.                                 
                                +-::.::-           *++-::.      .*.                                 
                               :*--::--          .===-..         +:                                 
                             .:-==---.             :::.          .-                                 
                             .:-=+-:.                .            :                                 
                              :-=++:                              .                                 
                                -==.                                                                
                                  :                                                                 
                                          .                                                         
                                         ::                                                         
                                         -.                                                         
                                         -.                                                         
                                         .                                                          
                                         .                                                          
                                                                                                    
                                                                                                    
                                                                                                    
                                         :                                                          
                                        .:                                                          
                                        ::.                                                         
                                        ::.                                                         
                                        :::.                                                        
                                        ....                                                        
                                        ....                                                        
                                        ....                                                        
                                        ....                                                        
                                        .....                                                       
                                        .....                                                       

                                        


`;

  return (
    <div
      style={{
        background: 'hsl(272, 32%, 8%)',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100vw',
      }}
    >
      <div className="mystic-card theme-venus" style={{ width: 'fit-content', minWidth: '40rem', margin: '5rem' }}>
        <div className="card-letter">Venus</div>
        <div className="corner top left"></div>
        <div className="corner top right"></div>
        <div className="corner bottom left"></div>
        <div className="corner bottom right"></div>

        <div className="card-corner-letter top-left">G</div>
        <div className="card-corner-letter bottom-right">G</div>

        <p style={{ lineHeight: '1.5', marginBottom: '1rem', textAlign: 'center' }}>
          This wreath of entertainment, yet no place for prosperity <br />
          a trove of simulcarnum, not unlike my childrens, my greatest of 400 years. <br />
          Perhaps this is why she brought me this reptile, for that cycle victory inevitably brings is laced with its venom.<br />
          From this, I watch my flourishes and stagnation documented in detail.
        </p>

        <div className="keyhole-wrapper" style={{ lineHeight: '1.5', marginBottom: '1rem', textAlign: 'center' }}>
          <code>https://www.youtube.com/watch?v=&lt;key&gt;</code>
        </div>

        <p style={{ lineHeight: '1.5', marginBottom: '1rem', textAlign: 'center' }}>
          She fed it the key. <br />
        </p>

        <p style={{ lineHeight: '1.5', marginBottom: '1rem', textAlign: 'center' }}>
          What message could be so dear, that she needed it under lock and key?
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