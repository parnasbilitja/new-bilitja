import React, { useState, useRef, useEffect } from 'react'


const Timer = ({phoneErrType,setState}) => {

	const Ref = useRef(null);

	const [timer, setTimer] = useState('00:00');

	const getTimeRemaining = (e) => {
		const total = Date.parse(e) - Date.parse(new Date());
		const seconds = Math.floor((total / 1000) % 60);
		const minutes = Math.floor((total / 1000 / 60) % 60);
		return {
			total, minutes, seconds
		};
	}

	const startTimer = (e) => {
		let { total, minutes, seconds }
					= getTimeRemaining(e);
		if (total >= 0) {

			setTimer(
				// (hours > 9 ? hours : '0' + hours) + ':' +
				(minutes > 9 ? minutes : '0' + minutes) + ':'
				+ (seconds > 9 ? seconds : '0' + seconds)
			)
		}
	}


	const clearTimer = (e) => {

		setTimer('00:30');

		if (Ref.current) clearInterval(Ref.current);
		const id = setInterval(() => {
			startTimer(e);
		}, 1000)
		Ref.current = id;
	}

	const getDeadTime = () => {
		let deadline = new Date();

		deadline.setSeconds(deadline.getSeconds() + 90);
		return deadline;
	}

    useEffect(() => {
		clearTimer(getDeadTime());
	}, []);

	const onClickReset = () => {
		clearTimer(getDeadTime());
	}

    useEffect(() => {
        onClickReset()
    },[phoneErrType])

	return (
		<div className="App">
			<h2>{timer}</h2>
			{/* <button onClick={onClickReset}>Reset</button> */}
		</div>
	)
}

export default Timer;
