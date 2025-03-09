/**
 * ฟังก์ชันสำหรับสุ่มตัวเลขที่ไม่ซ้ำกันจากช่วงที่กำหนด
 * @param {number} min - ค่าต่ำสุดของช่วงตัวเลข
 * @param {number} max - ค่าสูงสุดของช่วงตัวเลข
 * @param {number} count - จำนวนตัวเลขที่ต้องการ
 * @returns {number[]} - อาร์เรย์ของตัวเลขที่ไม่ซ้ำกัน
 * @throws {Error} - โยนข้อผิดพลาดหากช่วงตัวเลขไม่พอสำหรับค่าที่ไม่ซ้ำกัน
 */
export function getRandomUniqueNumbersUsingFilter(min: number, max: number, count: number):number[] {
    if (max - min + 1 < count) {
        throw new Error("ช่วงตัวเลขมีจำนวนไม่เพียงพอสำหรับค่าที่ไม่ซ้ำกัน");
    }

    const numbers = [];
    while (numbers.length < count) {
        let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!numbers.includes(randomNum)) {
            numbers.push(randomNum);
        }
    }

    return numbers;
}
