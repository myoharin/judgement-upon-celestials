import React, { useState } from 'react'
import '../.components/mystic.css';

export default function Pluto() {
  const forGod = "Levitus 4, what of for God? Why are you exempted from your listed sins, from cruelty, from _________. Are you not the devil of your own sin?"
  const asciiArt = `                                                                                           
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
      <div className="mystic-card theme-pluto" style={{ width: 'fit-content', minWidth: '40rem', margin: '5rem' }}>
        <div className="card-letter">Pluto</div>
        <div className="corner top left"></div>
        <div className="corner top right"></div>
        <div className="corner bottom left"></div>
        <div className="corner bottom right"></div>

        <div className="card-corner-letter top-left">{forGod}</div>
        <div className="card-corner-letter bottom-right">{forGod}</div>

        <div className="card-corner-letter top-left">E</div>
        <div className="card-corner-letter bottom-right">E</div>

        <p style={{ lineHeight: '1.5', marginBottom: '1rem', textAlign: 'center' }}>
          Last in order in the Harmonic Convergence, now forgotten
        </p>

        <div className="keyhole-wrapper" style={{ lineHeight: '1.5', marginBottom: '1rem', textAlign: 'center' }}>
          <code>GOD</code>
        </div>

        <p style={{ lineHeight: '1.5', marginBottom: '1rem', textAlign: 'center' }}>
          Primordial sin, crest on a card in plainside. Now lost to time <br />
        </p>

        <p style={{ lineHeight: '1.5', marginBottom: '1rem', textAlign: 'center' }}>
          Genesis 3-12 <br />
          Your emblem, your beloved boy, exclude us, belittle us, disgard us. <br />
          Creator, the underworld awaits you.
        </p>


        <pre
            style={{
              fontFamily: '"Courier New", Courier, monospace',
              lineHeight: '1.0',
              fontSize: '0.6rem',
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