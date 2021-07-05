import { FunctionComponent, useState } from 'react';
import { useQuery } from 'react-query';
import { Service } from './Service';
import ReactJson from 'react-json-view';
import DagreGraph from 'dagre-d3-react';
import { extractCategories, extractTags } from '../lib/helpers';
import { curveBasis } from 'd3';

type d3Node = {
  id: any;
  label: string;
  class?: string;
  labelType?: 'html' | 'svg' | 'string';
  config?: object;
};
const ROOT_SERVICE =
  localStorage.getItem('depGraphViz.rootService') || '/Gateway[Gateway]';

const Visualizer: FunctionComponent<{ endpoint: string }> = ({
  endpoint = localStorage.getItem('depGraphViz.endpoint') ||
    'http://localhost:4009',
}) => {
  const [openAll, setOpenAll] = useState(false);

  const { isLoading, error, data } = useQuery<any, Error>('depData', () =>
    fetch(endpoint).then((res) => res.json())
  );

  if (isLoading) return <>Loading...</>;

  if (error) return <>An error has occurred: {error.message}</>;

  const { services: serviceConfigs, parameters: parameterConfigs } =
    data.config.data;

  const gatewayApp = serviceConfigs[ROOT_SERVICE];

  const nodes: d3Node[] = Object.keys(serviceConfigs)
    .sort()
    .map((service) => {
      const class_ = serviceConfigs[service].class;
      return {
        id: service,
        label: `<strong>${service}</strong><br/>
    ${
      class_ &&
      `<span class="class-path">${class_}</span>
        <br/>` +
        extractTags(class_)
          .map(
            ([tag, color]) =>
              `<span class="tag" style="background-color: ${color}">
          ${tag}
        </span>`
          )
          .join('')
    }`,
        labelType: 'html',
        class: extractCategories(service)
          .map(([x]) => x)
          .join(' '),
        config: { height: 55 },
      };
    });

  let links: any[] = [];

  nodes.forEach((node) => {
    const service = serviceConfigs[node.id];

    service.arguments?.forEach((arg: string) => {
      const argKey = arg.replace('@', '');
      if (serviceConfigs.hasOwnProperty(argKey)) {
        links.push({
          source: node.id,
          target: argKey,
          config: {
            curve: curveBasis,
          },
        });
      }
    });
  });

  return (
    <div>
      <header>
        <h1>Dependency Graph Visualizer</h1>
      </header>
      <div className="row">
        <div className="col">
          <DagreGraph
            nodes={nodes}
            links={links}
            width="100%"
            height="600"
            animate={1000}
            shape="rect"
            zoomable
            config={{
              rankdir: 'LR',
              align: 'UL',
              ranker: 'longest-link',
            }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2>
            Dependency Explorer{' '}
            <button
              onClick={() => {
                setOpenAll(!openAll);
              }}
            >
              Expand/Collapse All
            </button>
          </h2>

          <Service
            serviceConfigs={serviceConfigs}
            name={ROOT_SERVICE}
            class_={gatewayApp.class}
            arguments_={gatewayApp.arguments}
            factory={gatewayApp.factory}
            open={openAll}
          />
        </div>
        <div className="col">
          <h2>Parameters</h2>
          <ReactJson
            src={parameterConfigs}
            theme="summerfruit:inverted"
            collapsed={2}
            displayDataTypes={false}
          />
        </div>
      </div>
    </div>
  );
};

export { Visualizer };
