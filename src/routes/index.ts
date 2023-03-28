import { Request, Response, Router } from 'express';
import { catchAsync, pick } from '../utils';
import * as constants from '../constants';
import store from '../../store';

const formatMemoryUsage = (data) =>
    `${Math.round((data / 1024 / 1024) * 100) / 100} MB`;

const routes = Router();

routes.get(
    '/',
    catchAsync((_req: Request, res: Response) => {
        const result = { ...constants };
        delete result.sender;
        res.status(200).json({ success: true, constants: result });
    }),
);

routes.get(
    '/cache',
    catchAsync((req: Request, res: Response) => {
        const query = req.query?.fields || '';
        const fields = query ? String(query).split(',') : [];
        console.log('fileds: ', fields);
        res.status(200).json(
            fields.length ? pick(store.getData(), fields) : store.getData(),
        );
    }),
);
routes.get(
    '/collection-bids',
    catchAsync((req: Request, res: Response) => {
        const query = req.query?.collectionIds || '';
        const collectionIds = query ? String(query).split(',') : [];
        const collectionBidsInfo = store.getData().collectionBidsInfo || {};

        res.status(200).json(
            collectionIds.length
                ? pick(collectionBidsInfo, collectionIds)
                : collectionBidsInfo,
        );
    }),
);

routes.get(
    '/memory-usage',
    catchAsync((_req: Request, res: Response) => {
        const memoryData = process.memoryUsage();

        const memoryUsage = {
            rss: `${formatMemoryUsage(
                memoryData.rss,
            )} -> Resident Set Size - total memory allocated for the process execution`,
            heapTotal: `${formatMemoryUsage(
                memoryData.heapTotal,
            )} -> total size of the allocated heap`,
            heapUsed: `${formatMemoryUsage(
                memoryData.heapUsed,
            )} -> actual memory used during the execution`,
            external: `${formatMemoryUsage(
                memoryData.external,
            )} -> V8 external memory`,
        };
        res.status(200).json(memoryUsage);
    }),
);

routes.get(
    '/pool-info',
    catchAsync((_req: Request, res: Response) => {
        const { liquiditiesInfo } = pick(store.getData(), ['liquiditiesInfo']);
        // if (!liquiditiesInfo) retu
        const hopersPrice =
            liquiditiesInfo[2].token2Reserve / liquiditiesInfo[2].token1Reserve;
        const bluePrice =
            (liquiditiesInfo[10].token1Reserve /
                liquiditiesInfo[10].token2Reserve) *
            hopersPrice;
        const pools = liquiditiesInfo.map((_liquidity) => {
            let bondingPeriods = [];
            if (_liquidity.stakingAddress) {
                if (typeof _liquidity.stakingAddress == 'string') {
                    bondingPeriods.push({
                        apr: Number(_liquidity.apr.replace('%', '')),
                        stakingAddress: _liquidity.stakingAddress,
                        rewardToken: _liquidity.config.rewardToken,
                        lockDuration: _liquidity.config.lockDuration,
                        distributionEnd: _liquidity.config.distributionEnd,
                    });
                } else {
                    _liquidity.stakingAddress.forEach(
                        (_stakingAddress, index) => {
                            bondingPeriods.push({
                                apr: Number(
                                    _liquidity.apr[index].replace('%', ''),
                                ),
                                stakingAddress:
                                    _liquidity.stakingAddress[index],
                                rewardToken:
                                    _liquidity.config[index].rewardToken,
                                lockDuration:
                                    _liquidity.config[index].lockDuration,
                                distributionEnd:
                                    _liquidity.config[index].distributionEnd,
                            });
                        },
                    );
                }
            }
            let poolId = _liquidity.id;
            let lpAddress = _liquidity.lpAddress;
            let ratio = _liquidity.ratio;
            const contractAddress = _liquidity.contract;
            const lpTokens = _liquidity.pool;
            const isVerified = _liquidity.isVerified;
            const token1Price =
                _liquidity.token1 == 'blue' ? bluePrice : hopersPrice;
            const liquidity = {
                usd: 0,
                token1: {
                    amount: _liquidity.token1Reserve,
                    tokenPrice: token1Price,
                    denom: _liquidity.token1,
                },
                token2: {
                    amount: _liquidity.token2Reserve,
                    tokenPrice:
                        (_liquidity.token1Reserve / _liquidity.token2Reserve) *
                        token1Price,
                    denom: _liquidity.token2,
                },
            };
            return {
                bondingPeriods,
                poolId,
                lpAddress,
                ratio,
                contractAddress,
                lpTokens,
                isVerified,
                liquidity,
            };
        });
        res.status(200).json(pools);
    }),
);

export { routes };
