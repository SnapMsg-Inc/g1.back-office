import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import styles from '../../styles/pages/dashboard.module.css'
import 'react-tabs/style/react-tabs.css';

export default function Dashboard() {
    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <div className={styles.title}>
                    <h3>Dashboard</h3>
                </div>
                <div className={styles.tabContainer}>
                    <Tabs>
                        <TabList className={styles.tabList}>
                            <Tab>Users Dashboard</Tab>
                            <Tab>Posts Dashboard</Tab>
                        </TabList>
                        <TabPanel>
                            <div className={styles.containerFrame}>
                                <iframe className={styles.frame}
                                    title='Users'
                                    src='https://p.us5.datadoghq.com/sb/9259dfd8-4e68-11ee-b05c-da7ad0900005-de0474842a3324b348276418ef95f96b?theme=dark'
                                />                            
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className={styles.containerFrame}>
                                <iframe className={styles.frame}
                                    title='Posts'
                                    src='https://p.us5.datadoghq.com/sb/9259dfd8-4e68-11ee-b05c-da7ad0900005-de0474842a3324b348276418ef95f96b?theme=dark'
                                />                            
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}