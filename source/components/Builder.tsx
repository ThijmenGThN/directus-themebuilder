import { useEffect, useState } from 'react';

import * as shade from '@/resources/shade';

export default function Builder({builderHex}) {
	
	const [hex, setHex] = useState<string>('#6644ff');
	const [palette, setPalette] = useState<Array<string>>(['#6644FF', '#FE98D9', '#00D1A3', '#96A5F2']);
	const [object, setObject] = useState<string>('');
	const [copied, setCopied] = useState<boolean>(false);

	function appendColor(color: string) {
		let buffer = palette.slice(0);
		buffer.unshift(color);
		buffer.length > 10 && buffer.pop();
		setPalette(buffer);
	}

	function copy() {
		setCopied(true);
		navigator.clipboard.writeText(object);
		setTimeout(() => setCopied(false), 2500);
	}

	useEffect(() => {
		setObject(shade.wrap(hex));
	}, [hex]);

	//useEffect(() => setPalette([...Array(3)].map(() => shade.random())), []);

	return (
		<div className="mt-6 flow-root">
			<div className="pallete flex mb-7 mt-4">
				<ul className="flex items-center">
					{/* needs an active class after click for border effect */}
					{palette.map((color: string, index: number) => (
						<li key={index} className="rounded-full relative w-14 h-14 bg-white hover:cursor-pointer mr-3 border-2" style={{ filter: `drop-shadow(0px 0.913793px 9.13793px ${color})`, borderColor:color }} onClick={() => {setHex(color);builderHex(color);}} >
							<span className="inline-block absolute h-10 w-10 rounded-full top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 " style={{ backgroundColor: color, }}></span>
						</li>
					))}
				</ul>

				<div className="relative flex items-center">
					<div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-neutral-300">
						<svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g clip-path="url(#clip0_125_258)">
								<path
									d="M3.40625 0.593749C3.8125 0.999999 4.01562 1.46875 4.01562 2C4.01562 2.53125 3.8125 3 3.40625 3.40625C3 3.8125 2.53125 4.01562 2 4.01562C1.46875 4.01562 0.999999 3.8125 0.593749 3.40625C0.187499 3 -0.0156255 2.53125 -0.0156255 2C-0.0156255 1.46875 0.1875 0.999999 0.59375 0.593749C1 0.187499 1.46875 -0.0156258 2 -0.0156258C2.53125 -0.0156258 3 0.187499 3.40625 0.593749ZM9.40625 0.59375C9.8125 1 10.0156 1.46875 10.0156 2C10.0156 2.53125 9.8125 3 9.40625 3.40625C9 3.8125 8.53125 4.01562 8 4.01562C7.46875 4.01562 7 3.8125 6.59375 3.40625C6.1875 3 5.98437 2.53125 5.98437 2C5.98437 1.46875 6.1875 0.999999 6.59375 0.593749C7 0.187499 7.46875 -0.0156255 8 -0.0156255C8.53125 -0.0156255 9 0.1875 9.40625 0.59375ZM12.5937 3.40625C12.1875 3 11.9844 2.53125 11.9844 2C11.9844 1.46875 12.1875 1 12.5937 0.59375C13 0.1875 13.4687 -0.0156253 14 -0.0156253C14.5312 -0.0156252 15 0.1875 15.4062 0.59375C15.8125 1 16.0156 1.46875 16.0156 2C16.0156 2.53125 15.8125 3 15.4062 3.40625C15 3.8125 14.5312 4.01562 14 4.01562C13.4687 4.01562 13 3.8125 12.5937 3.40625Z"
									fill="#A2B5CD"
								/>
							</g>
							<defs>
								<clipPath id="clip0_125_258">
									<rect width="16" height="4" fill="white" />
								</clipPath>
							</defs>
						</svg>
					</div>
					<input
						className="absolute top-0 left-0 w-full h-full opacity-0 hover:cursor-pointer"
						onBlur={({ target }) => {
							setHex(target.value);
							//appendColor(target.value);
							builderHex(target.value);
						}}
						onChange={({ target }) => setHex(target.value)}
						type="color"
					/>
				</div>
			</div>

			<button className="text-white text-xl copy__button rounded-full" onClick={copy}>
				{copied ? <span>Copied 🎉</span> : <span><svg className='inline mr-1 align-middle relative -top-[2px]' xmlns="http://www.w3.org/2000/svg" fill="white" height="24" viewBox="0 -960 960 960" width="24"><path d="M180-81q-24 0-42-18t-18-42v-573q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T180-714v573h444q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5Q654-98 645.375-89.5T624-81H180Zm120-120q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Zm0-60h440v-560H300v560Zm0 0v-560 560Z"/></svg> Copy CSS</span>}
			</button>
		</div>
	);
}
