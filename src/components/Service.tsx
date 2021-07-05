import { FunctionComponent } from 'react';
import { extractTags } from '../lib/helpers';

export type ServiceProps = {
  name: string;
  class_: string;
  arguments_?: string[];
  factory?: string[];
  serviceConfigs: any;
  open?: boolean;
};

const Service: FunctionComponent<ServiceProps> = ({
  name,
  class_,
  arguments_,
  factory,
  serviceConfigs,
  open,
}) => {
  return (
    <div className="service">
      <details open={open}>
        <summary>
          <h3>
            {name}{' '}
            {class_ &&
              extractTags(class_).map(([tag, color]) => (
                <span className="tag" style={{ backgroundColor: color }}>
                  {tag}
                </span>
              ))}
          </h3>
        </summary>
        <div className="service-content">
          <p className="class-path">{class_}</p>

          {arguments_ && (
            <ul className="arguments-list">
              {arguments_.map((arg) => {
                const argKey = arg.replace('@', '');

                if (serviceConfigs.hasOwnProperty(argKey)) {
                  const {
                    arguments: args_,
                    class: cls_,
                    factory: fct_,
                  } = serviceConfigs[argKey];
                  return (
                    <li>
                      <Service
                        name={arg}
                        class_={cls_}
                        arguments_={args_}
                        factory={fct_}
                        serviceConfigs={serviceConfigs}
                        open={open}
                      />
                    </li>
                  );
                } else return <li>{arg}</li>;
              })}
            </ul>
          )}
          {factory && (
            <>
              <h4>Factory:</h4>
              <ul>
                {factory?.map((factoryFrag) => (
                  <li>{factoryFrag}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </details>
    </div>
  );
};

export { Service };
