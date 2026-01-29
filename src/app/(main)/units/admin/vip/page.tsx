import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarRange, TrendingUp } from "lucide-react";
import React from "react";
import { VipTable } from "./components/vip-table";

const page = () => {
  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Başlık Bölümü */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Genel Vip Kayıt Datası
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          VIP taleplerinin günlük, haftalık ve aylık istatistikleri
        </p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Günlük Kart */}
        <Card className="relative overflow-hidden border-2 hover:border-[#44bf3b]/50 transition-all duration-300 hover:shadow-lg group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#44bf3b]/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#44bf3b]/10 rounded-lg">
                  <CalendarRange className="w-5 h-5 text-[#44bf3b]" />
                </div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                  Günlük VIP Talebi
                </h3>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-1">4</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-[#44bf3b]" />
                  Son 24 saat
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Haftalık Kart */}
        <Card className="relative overflow-hidden border-2 hover:border-[#44bf3b]/50 transition-all duration-300 hover:shadow-lg group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#44bf3b]/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#44bf3b]/10 rounded-lg">
                  <CalendarRange className="w-5 h-5 text-[#44bf3b]" />
                </div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                  Haftalık VIP Talebi
                </h3>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-1">14</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-[#44bf3b]" />
                  Son 7 gün
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Aylık Kart */}
        <Card className="relative overflow-hidden border-2 hover:border-[#44bf3b]/50 transition-all duration-300 hover:shadow-lg group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#44bf3b]/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#44bf3b]/10 rounded-lg">
                  <CalendarRange className="w-5 h-5 text-[#44bf3b]" />
                </div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                  Aylık VIP Talebi
                </h3>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-1">34</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-[#44bf3b]" />
                  Son 30 gün
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* VIP Tablosu */}
      <div className="mt-8">
        <VipTable />
      </div>
    </div>
  );
};

export default page;
