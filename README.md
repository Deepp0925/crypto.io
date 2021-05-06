# Crypto.IO

Website - [crypto.io](https://deepp0925.github.io/crypto.io)

Files

- design.pdf - contains the design for the website(Pages are most likely out of order).

Our web app is composed of four html pages, one css page, and seven java script files. 
The home page is connected to the about, contact, and creators page via <a> tags. 
Our web app allows the user to encrypt, decrypt, compress, and decompress. 
All of these functions are accessed through buttons and pop ups on the home page.
The user is then prompted to upload a file and choose the encryption/ compression method that they prefer.
  
Each page does not use all of the content of the CSS file. 
The CSS file is segmented by comments.
Each comment is stating what html page that the CSS code below the comment is affecting.

With the encrypt, decrypt, compress, and decompress the user clicks on the strt button which will bring up a popup
The user it then prompted through the following lateraly: select file, select algorithm, progress and finish. It then automaticly downloads the file onto your computer
Oboiusly both of the encrypted/ decrypted files have to have the same algorithm in order to function properly. Same with compression/ decompression

The only limitations that we have come across is that for the encryption algorithms there is a 30MB limit that anything over will crash it
Also with the LZ77 we were only able to make it work with a text file. It will not accept anything other than that. However the Deflate will work with anything.
