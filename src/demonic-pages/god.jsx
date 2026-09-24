import React from 'react';
import '../.components/demonic.css';
import { DemonicPhrase } from '../.components/demonic-phrase';

// Large High-Density Flame Banner
const HERO_FLAME_ASCII = `
                                           █         █                                              
                                           ███████████                                              
                                           █ ██ █ ████                                              
                                           ████ █ ████                                              
                                           ██ ███ █ ██                                              
                                           ██ ███ █ ██                                              
                                           ███████████                                              
                                           ██ ████████                                              
                                           ██ ████████                                              
                                           █████ █████                                              
                                           ██ ████ ███                                              
                                           ███████  ██                                              
                                           ████████ ██                                              
                                           ████████ ██                                              
                                           ████ █ █ ██                                              
                                           ██████ █ ██                                              
                                           ████████ ██                                              
                                           ████████ ██                                              
                                           █████ █████                                              
     ██████████████           ███████████████████ ██████████████████         ███████████████        
     ██████████████            ████████████   ███████ █████████████         ████████████████        
     ███████████████            ████  ███ █ ███████ ██████████████          █████████████ ██        
     ███████████████             ████████ █ █████ ██████████████           ███    ██████████        
     █████████   ████             ███████ █ █████ █████████████            █████████████████        
     █████████████████             ██████████████ ███████████             ██████████████████        
                    ███                    ██ ███ █ ██                   █                          
                      ██                   █ ████ ████                  █████                       
                                           ███████████                 ███                          
                                           ██████                     ██                            
                                                                                                    
                                                           █                                        
                                                        █                                           
                                                   █        █                                       
                                                        █                                           
                                                                                                    
                                           ████████████                                             
                                           ███████████                                              
                                           ████████ ██                                              
                                           ████████ ██                                              
                                           ████████ ██                                              
                                           ██ ███ █ ██                                              
                                           ██ ████████                                              
                                           ██ ████ ███                                              
                                           ██ █████ ██                                              
                                           █████ ███ █                                              
                                           ███████ ███                                              
                                           █████ █ ███                                              
                                           █████ █ █ █                                              
                                           ███████ ███                                              
                                           █████ █ ███                                              
                                           ████  █ ███                                              
                                           █████ █ ███                                              
                                           ███ █ █ █ █                                              
                                           ███  ████ █                                              
                                           ████ ███  █                                              
                                           ████ ██████                                              
                                           ███████████                                              
                                           ███ █ █████                                              
                                           █████ █████                                              
                                           ███████████                                              
                                           ████████ ██                                              
                                           ████ ██████                                              
                                           ████ █ ████                                              
                                           ███████████                                              
                                           ████ ██████                                              
                                           █████ █ █ █                                              
                                           █████████ █                                              
                                           ████████ ██                                              
                                           ████   ████                                              
                                           ██ ████ █ █                                              
                                           █████████ █                                              
                                           ███████████                                              
                                           ███████████                                              
                                           ███████████                                              
                                           ███████████                                              
                                           ███████  ██                                              
                                           █      ████                                              
                                           █         █                                              
████████████████████████████████████████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████████████████████████████████████████
████ █   █      █         █    ██████████████████████ ████████   █████████████████          █   ████
████  █    █      █   █ █      ██████████████████████     █                                     ████
████████████████████████████████████████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████████████████████████████████████████
`;

const FLAME_CORNER = `
                                                3333                                                
                                              33333333                                              
                                            33333  33333                                            
                                          33333      33333                                          
                                        33333          33333                                        
                                       3333      33      3333                                       
                                     33333     333333     33333                                     
                                    3333     3333333333     3333                                    
                                   3333     3333    3333     3333                                   
                                  3333    3333333333333333    3333                                  
                                 3333    333333333333333333333 3333                                 
                                3333    3333             33333333333                                
                             333333    3333                    33333333                             
                           3333333     333    33333333             333333                           
                         333333333    33333333333333333333333         33333                         
                       33333  333    3333333            333333333       33333                       
                     33333   3333    333                    33333333      33333                     
                    3333     333     333                    333  33333      3333                    
                  3333      3333    3333                    3333    3333      3333                  
                 3333     333333    333                      333    333333     3333                 
                3333     3333333    333                      333    3333333     3333                
               3333    3333 3333    3333333333333333333333333333    3333 3333    3333               
              3333    3333  3333 3333333333333333333333333333333    3333  3333    3333              
             3333    3333   333333333                        333    3333   3333    3333             
             333     333 3333333                             333    3333333 333     333             
            3333    333333333          3333333333333333333333333    333333333333    3333            
            333     33333         33333333333333333333333333333    3333    33333     333            
            333    3333        333333333                    333    333       33333   333            
            333    333     3333333    333                  333    3333333      33333 333            
            333    333   333333333    3333                3333    333333333      3333333            
            333    333333333   3333    3333              3333    3333   33333      33333            
           3333    333333       333     3333            3333     333       3333      3333           
         333333    33333        3333     3333          3333     3333        33333     33333         
        3333333     333          3333     3333        3333     3333          333333     3333        
        333  333    3333          3333     3333      3333     3333          33333333     333        
      3333   333     333           3333     33333  33333     3333           333  3333     3333      
     3333    3333    3333            3333     33333333     3333            3333    333     3333     
     333     33333    3333            3333      3333      3333            3333    33333     333     
    3333    333333     3333            33333     333333 33333            3333     333333    3333    
    333    3333 333     3333             33333      3333333             3333     333 3333    333    
   3333    333  3333     33333         33333333       3333333         33333     3333  333    3333   
   333    3333   33333     33333 3333333333  33333       3333333333 33333     33333   3333    333   
  3333    33333333333333333333333333333        333333        3333333333      3333333333333    3333  
  333        33333333333333333333            3333333333         33333      333333333333       3333  
  3333                                   3333333    3333333 3333333      33333                3333  
  3333333333                       33333333333333333333333333333       33333            3333333333  
      3333333333333333333333333333333333 333333333333333333          3333333333333333333333333      
             3333333333333333333333                              3333333333333333333333             
                               333333333                    333333333                               
                                  33333333333333333333333333333333                                  
                                         333333333333333333                                         
                     
                                         

`

const leaf_text = "You might try then, as I did, to find a sky so full of stars it will blind you again. Only no sky can blind you now. Even with all that iridescent magic up there, your eye will no longer linger on the light, it will no longer trace constellations. You'll care only about the darkness and you'll watch it for hours, for days, maybe even for years, trying in vain to believe you're some kind of indispensable, universe-appointed sentinel, as if just by looking you could actually keep it all at bay. It will get so bad you'll be afraid to look away, you'll be afraid to sleep.\nThen no matter where you are, in a crowded restaurant or on some desolate street or even in the comforts of your own home, you'll watch yourself dismantle every assurance you ever lived by. You'll stand aside as a great complexity intrudes, tearing apart, piece by piece, all of your carefully conceived denials, whether deliberate or unconscious. And then for better or worse you'll turn, unable to resist, though try to resist you still will, fighting with everything you've got not to face the thing you most dread, what is now, what will be, what has always come before, the creature you truly are, the creature we all are, buried in the nameless black of a name.\nAnd then the nightmares will begin. "

const process_leaf_text = (text) => {
  // new line every 40 characters
  // find "\n" and add few more lines
  const chunkSize = 80;
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks.map((chunk, index) => (
    <p key={index}>{chunk}</p>
  ));
};

export default function God() {
  return (
    <div className="demonic-canvas">
      <div className={`demonic-card theme-god`}>
        {/* ASCII Corner & Edge Flame Decorations */}
        <pre className="ascii-corner top-left">{FLAME_CORNER}</pre>
        <pre className="ascii-corner top-right">{FLAME_CORNER}</pre>
        <pre className="ascii-corner bottom-left">{FLAME_CORNER}</pre>
        <pre className="ascii-corner bottom-right">{FLAME_CORNER}</pre>

        {/* Minimal Single Phrase */}
        <DemonicPhrase phrase={import.meta.env.VITE_PLUTO_QUOTE} />


        {/* Hero Braille Flame Header Banner */}
        <pre className="demonic-ascii-flame-banner">
          {HERO_FLAME_ASCII}
          {" "}
          {" "}
          {" "}
          {process_leaf_text(leaf_text)}
          </pre>
      </div>
    </div>
  );
}