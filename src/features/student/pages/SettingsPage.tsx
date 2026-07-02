import StudentLayout from "../layout/StudentLayout.tsx";

import SettingsHeader from "../components/settings/SettingsHeader";
import ProfileCard from "../components/settings/ProfileCard";
import SecurityCard from "../components/settings/SecurityCard";
import NotificationsCard from "../components/settings/NotificationsCard";

function SettingsPage() {
    return (
        <StudentLayout>
            <div className="w-full space-y-8">
                <SettingsHeader />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8">
                        <ProfileCard />
                    </div>

                    <div className="lg:col-span-4">
                        <SecurityCard />
                    </div>

                    <div className="lg:col-span-12">
                        <NotificationsCard />
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}

export default SettingsPage;