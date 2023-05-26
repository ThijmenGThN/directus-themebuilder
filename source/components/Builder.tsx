import { useEffect, useState } from 'react';

import * as shade from '@/resources/shade';

export default function Builder() {
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
			<div className="pallete flex">
				<ul className=" overflow-hidden ">
					{palette.map((color: string, index: number) => (
						<li key={index} className="rounded-full h-10 w-10 inline-block hover:cursor-pointer" style={{ backgroundColor: color }} onClick={() => setHex(color)} />
					))}
				</ul>

				<div className="relative flex">
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
						}}
						onChange={({ target }) => setHex(target.value)}
						type="color"
					/>
				</div>
			</div>

			<button className="text-white text-xl copy__button rounded-full" onClick={copy}>
				{copied ? <span>Copied 🎉</span> : <span>Copy CSS</span>}
			</button>
		</div>
	);
}
