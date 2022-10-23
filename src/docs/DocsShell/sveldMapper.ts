import type { Sveld } from './types';

// Mapper: Props
export function sveldMapperProps(sveld: Sveld): any {
	const { props } = sveld.source;
	// Filter props with undefined types (exclude getContext)
	const propsFiltered = props.filter((p: any) => p.type !== undefined);
	// Return table headings/source
	return {
		headings: ['Name', 'Type', 'Value', 'Description'],
		source: propsFiltered.map((p: any) => {
			// Description Parser Hook
			// const descObj: object = descriptionTagParser(p.description);
			// prettier-ignore
			return [
				`<code>${p.name}<?code>`,
				`<em>${p.type}</em>`,
				!["''", undefined].includes(p.value) ? p.value : '-',
				p.description ? p.description : '-'
			];
		})
	};
}

// Mapper: Slots
export function sveldMapperSlots(sveld: Sveld): any {
	const { slots } = sveld.source;
	return {
		headings: ['Name', 'Default', 'Fallback', 'Props'],
		source: slots.map((s: any) => {
			// prettier-ignore
			return [
				`<code>${s.name.replaceAll('__','')}</code>`,
				s.default ? '&check;' : '-',
				s.fallback ? `<pre>${s.fallback}</pre>` : '-', // TODO: need to format this as code
				s.slot_props ? s.slot_props : '-'
			];
		})
	};
}

// Mapper: Events
export function sveldeMapperEvents(sveld: Sveld): any {
	const { events } = sveld.source;
	console.log(events);
	return {
		headings: ['Name', 'Type', 'Element'],
		source: events.map((e: any) => {
			// prettier-ignore
			return [
				`<code>on:${e.name}</code>`,
				`<em>${e.type}</em>`,
				e.element ? e.element : '-'
			];
		})
	};
}

// ---

/*
FROM CHRIS:
Let's aim for something more like this. Rather than trying to format every
description element in every single Sveld item, we handle it per instance.
The idea being that prop desc tags may differ from slot desc tags. It also
allows us to pass unique settings per instance rather than just assuming
they'll all be the same.
*/
// function descriptionTagParser(description: string): object {
// 	// (parse the description)
// 	return {};
// }
/*
Likewise we might follow the lead above and have unique versions of the desc parser
per each type of data as well so they can be purpose-built for only the description
data they are handling. Though the universal method above may suffice.
*/
// function propDescTagParser(d) {}

// ----

// export function parseDescriptionAndTagsFromJSDocs(jsDocs: string) {
// 	let description: string = '';
// 	let tags: { [key: string]: string } = {};
// 	let capturingDescription = true;
// 	let currentTag = '';
// 	let currentCapture = '';
// 	let currentChar = '';

// 	for (let x = 0; x < jsDocs.length; x++) {
// 		currentChar = jsDocs[x];
// 		switch (currentChar) {
// 			case '@':
// 				//tag at front wipes out description
// 				if (capturingDescription && x < 1) {
// 					capturingDescription = false;
// 				}
// 				// normal capture of leading description till a tag
// 				if (capturingDescription && currentCapture.length > 1) {
// 					description = currentCapture;
// 					currentCapture = '';
// 					capturingDescription = false;
// 				}
// 				//two tags in a row, stash the first before capturing name of second below.
// 				if (currentTag.length > 1) {
// 					tags[currentTag] = currentCapture;
// 					currentTag = '';
// 					currentCapture = '';
// 				}
// 				//at start of tag, seek till space char for tag name
// 				while (x != jsDocs.length && currentChar != ' ') {
// 					currentTag += currentChar;
// 					x++;
// 					currentChar = jsDocs[x];
// 				}
// 				break;
// 			default:
// 				// capturing value of description or tag
// 				currentCapture += currentChar;
// 				break;
// 		}
// 	}
// 	//if a tag finishes the jsDoc string
// 	if (currentTag.length) {
// 		tags[currentTag] = currentCapture;
// 	}
// 	return [description, tags];
// }
