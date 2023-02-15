import React, { useState, useCallback , useEffect} from "react";
export const Card = props => {
  const [active, setActive] = useState(false);
  const [move, setMove] = useState(false);
  const [limit, setLimit] = useState(false);
  const [mouseStartPosX, setMouseStartPosX] = useState(null);
  const [mouseStartPosY, setMouseStartPosY] = useState(null);
  const [mouseCurrPosX, setMouseCurrPosX] = useState(null);
  const [mouseCurrPosY, setMouseCurrPosY] = useState(null);
  const [Posx, setPosx] = useState(null);
  const [Posy, setPosy] = useState(null);
  const [k, setK] = useState(0.2);
  const [restX, setRestX] = useState(0);
  const [restY, setRestY] = useState(0);
  const [fx, setFx] = useState(0);
  const [fy, setFy] = useState(0);
  const [ax, setAx] = useState(0);
  const [ay, setAy] = useState(0);
  const [vx, setVx] = useState(0.0);
  const [vy, setVy] = useState(0.0);
  const [mass, setMass] = useState(0.7);
	const [damping, setDamping] = useState(0.8);
	
	const animate =() => {
		let el = document.getElementById("card" + props.no);
	
		if (Posx > window.innerWidth + 400 || Posx < -window.innerWidth - 400) {
			cancelAnimationFrame(animate);
			setActive(false)
		} else {
		  requestAnimationFrame(animate);
		}
	
		if (active) {
		  el.style.transform = "translate(" + Posx + "px" + "," + Posy + "px) rotate(" + Posx / 9 + "deg) perspective(800px)";
		  updateCard();
		}
	  };
  useEffect(() => {
    animate();
  });
  const handleDown = useCallback((e) => {
    setMove(true);
    setActive(true);
    setMouseStartPosX(e.clientX);
    setMouseStartPosY(e.clientY);
  });
  const handleTouchStart = useCallback((e) => {
    e.persist();
    setMove(true);
    setActive(true);
    setMouseStartPosX(e.touches[0].screenX);
    setMouseStartPosY(e.touches[0].screenY);
    console.log(mouseStartPosX);
  });
  const handleMove = useCallback((e) => {
    if (!limit) {
      if (move) {
        let mouseCurrPosX = e.clientX;
        let mouseCurrPosY = e.clientY;
        let Posx = mouseCurrPosX - mouseStartPosX;
        let Posy = mouseCurrPosY - mouseStartPosY;
        let el = document.getElementById("card" + props.no);
        let height = window.innerHeight;
        let width = window.innerWidth;
        let maxX = width - width * 20 / 100;

        function map_range(value, low1, high1, low2, high2) {
          return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
        }

        let mouseRange = mouseCurrPosX;

        if (mouseRange < width / 2) {
          mouseRange = width - mouseRange;
        }

        let damping = map_range(mouseRange, width / 2, width - width * 10 / 100, 0.6, 0.8);
        setPosx(Posx);
        setPosy(Posy);
        setDamping(damping);
        setMouseCurrPosX(mouseCurrPosX);
        setMouseCurrPosY(mouseCurrPosY);

        if (mouseCurrPosX > width - width * 20 / 100) {
          let restX, restY;

          if (mouseCurrPosX > width / 2) {
            restX = Posx * 5;
          } else {
            restX = -Posx * 5;
          }

          if (mouseCurrPosY > height / 2) {
            restY = Posy * 5;
          } else {
            restY = Posy * 5;
          }

          let limit = true;
          let move = false;
          let damping = 0.06;
          setRestX(restX);
          setRestY(restY);
          setLimit(limit);
          setMove(move);
			setDamping(damping);
			setTimeout(() => {
				window.cancelAnimationFrame(animate);
			}, 10);
        } else if (mouseCurrPosX < width * 20 / 100) {
          let restX, restY;

          if (mouseCurrPosX > width / 2) {
            restX = -Posx * 5;
          } else {
            restX = Posx * 5;
          }

          if (mouseCurrPosY > height / 2) {
            restY = Posy * 5;
          } else {
            restY = Posy * 5;
          }

          let limit = true;
          let move = false;
          let damping = 0.06;
          setRestX(restX);
          setRestY(restY);
          setLimit(limit);
          setMove(move);
          setDamping(damping);
        }
      }
    }
  });
  const handleTouchMove = useCallback((e) => {
    e.persist();

    if (!limit) {
      if (move) {
        let mouseCurrPosX = e.touches[0].screenX;
        let mouseCurrPosY = e.touches[0].screenY;
        let Posx = mouseCurrPosX - mouseStartPosX;
        let Posy = mouseCurrPosY - mouseStartPosY;
        let el = document.getElementById("card" + props.no);
        let height = window.innerHeight;
        let width = window.innerWidth;
        let maxX = width - width * 20 / 100;

        function map_range(value, low1, high1, low2, high2) {
          return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
        }

        let mouseRange = mouseCurrPosX;

        if (mouseRange < width / 2) {
          mouseRange = width - mouseRange;
        }

        let damping = map_range(mouseRange, width / 2, width - width * 10 / 100, 0.6, 0.8);
        setPosx(Posx);
        setPosy(Posy);
        setDamping(damping);
        setMouseCurrPosX(mouseCurrPosX);
        setMouseCurrPosY(mouseCurrPosY);

        if (mouseCurrPosX > width - width * 10 / 100) {
          let restX, restY;

          if (mouseCurrPosX > width / 2) {
            restX = Posx * 5;
          } else {
            restX = -Posx * 5;
          }

          if (mouseCurrPosY > height / 2) {
            restY = Posy * 5;
          } else {
            restY = Posy * 5;
          }

          let limit = true;
          let move = false;
          let damping = 0.08;
          setRestX(restX);
          setRestY(restY);
          setLimit(limit);
          setMove(move);
			setDamping(damping);
			setTimeout(() => {
				window.cancelAnimationFrame(animate);
			}, 10);
        } else if (mouseCurrPosX < width * 10 / 100) {
          let restX, restY;

          if (mouseCurrPosX > width / 2) {
            restX = -Posx * 5;
          } else {
            restX = Posx * 5;
          }

          if (mouseCurrPosY > height / 2) {
            restY = Posy * 5;
          } else {
            restY = Posy * 5;
          }

          let limit = true;
          let move = false;
          let damping = 0.08;
          setRestX(restX);
          setRestY(restY);
          setLimit(limit);
          setMove(move);
          setDamping(damping);
        }
      }
    }
  });
  const handleUp = useCallback(() => {
    setMove(false);
  });
  const handleTouchEnd = useCallback(() => {
	  setMove(false);
  });
  const updateCard = useCallback(() => {
    if (!move) {
      setFx(-k * (Posx - restX));
      setFy(-k * (Posy - restY));
	  setAx(fx/mass);
		setAy(fy / mass);
		setVx(damping* (vx+ax))
		setVy(damping * (vy + ay))
		setPosx(Posx+vx)
		setPosy(Posy+vy)
	}
  });
 
  return <div id={"card" + props.no} className={"card color" + props.no} onMouseDown={handleDown} onMouseMove={handleMove} onMouseUp={handleUp} onMouseLeave={handleUp} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
				<div className="text">DRAG THE CARD LEFT OR RIGHT</div>
			</div>;
};