import { useState, useRef, forwardRef } from 'react';
import './imageZoom.css';

interface ImageZoomProps {
    children: any;  // expect image as the only child
}
/* ---------------Image Zoom Component -------------- */
const ImageZoom = forwardRef(({ children }: ImageZoomProps, ref: any) => {

    const [isVisible, setIsVisible] = useState(false); //control zoom box visibility
    const resultRef = useRef<HTMLDivElement>(null);
    const lensRef = useRef<HTMLDivElement>(null);   //referes to lens div element

    let img = ref.current;  // referes to the child image element

    /**
     * 
     * @param e event
     */
    function moveLens(e: any) {
        // console.log(e.pageX)
        e.preventDefault()

        let x, //x coordinate of the lens
            y, //y coordinate of the lens
            cx, //x coordinate of the lens inside the image box
            cy  //y coordinate of the lens inside the image box

        let lens = lensRef.current
        let result = resultRef.current

        let pos = getCursorPos(e)  //get the current position of the mouse in the image box

        if (lens && result && img) {
            // get the coordinates and center the mouse in the lens
            x = pos.x - (lens.offsetWidth / 2)
            y = pos.y - (lens.offsetHeight / 2)

            // prevent the lens from being positioned outside the image
            if (x > img.width - lens.offsetWidth) {
                x = img.width - lens.offsetWidth
            }

            if (x < 0) { x = 0 }
            if (y > img.height - lens.offsetHeight) {
                y = img.height - lens.offsetHeight
            }

            if (y < 0) { y = 0 }

            // set the position of the lens
            lens.style.left = x + "px"
            lens.style.top = y + "px"

            // display what the lens "sees"
            cx = result.offsetWidth / lens.offsetWidth
            cy = result.offsetHeight / lens.offsetHeight

            result.style.background = "url('" + img.src + "')"
            result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
            result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px"

        }

    }

    /**
     * get the cursor position on the page
     * @param e mouse event
     * @returns coordinate object
     */
    function getCursorPos(e: any) {

        let a, //child image info
            x = 0, //x coordinate of the mouse in the box
            y = 0; //y coordinate of the mouse in the box
        e = e || window.event; // get window event when e is undefined

        /*get the x and y positions of the image:*/
        if (img) {
            a = img.getBoundingClientRect(); //get img box info

            /*calculate the cursor's x and y coordinates, inside the image box:*/
            x = e.pageX - a.left;
            y = e.pageY - a.top;

            /*takeof any page scrolling:*/
            x = x - window.pageXOffset;
            y = y - window.pageYOffset;
        }
        return { x, y };
    }

    let lensClass = "";
    let resultClass = "";
    if (isVisible) {
        lensClass = "img-zoom-lens";
        resultClass = "img-zoom-result"
    }

    return (
        <>
            <div className="img-zoom-container" onMouseMove={moveLens} onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
                {children}
                <div ref={lensRef} className={lensClass}></div>
                <div ref={resultRef} className={resultClass}></div>
            </div>
        </>
    )
})

export default ImageZoom