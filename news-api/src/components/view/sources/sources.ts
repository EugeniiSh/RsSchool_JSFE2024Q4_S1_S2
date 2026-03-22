import './sources.css';

interface SourceObject {
    id: string;
    name: string;
    category: string;
    country: string;
    description: string;
    language: string;
    url: string;
}

class Sources {
    draw(data: SourceObject[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item: SourceObject) => {
            const sourceClone = sourceItemTemp?.content.cloneNode(true) as DocumentFragment;

            const itemElement = sourceClone.querySelector('.source__item-name') as HTMLElement;
            itemElement.textContent = item.name;
            sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources');
        sourcesContainer?.append(fragment);
    }
}

export { Sources, SourceObject };
